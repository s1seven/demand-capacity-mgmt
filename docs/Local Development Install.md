Table of Contents

1. [DCMFOSS Local Development Deployment](#dcmfoss-local-development-deployment)
   - [Prerequisites](#prerequisites)
   - [Guide](#guide)
      - [Cloning the repository](#cloning-the-repository)
      - [Open in your own IDE of choice](#open-in-your-own-ide-of-choice)
      - [Docker desktop](#docker-desktop)
      - [Running containers](#running-containers)
      - [Running project first time for init configs](#running-project-first-time-for-init-configs)
      - [Running Keycloak](#running-keycloak)
      - [Fetching the keycloak client credential](#fetching-the-keycloak-client-credential)
      - [Configure postman collection requests](#configure-postman-collection-requests)
      - [Run the front-end](#run-the-front-end)
   - [Postmand Collection](#Postman-collection)
   - [Notice](#notice)


# DCMFOSS Local Development Deployment


## Prerequisites

This guide assumes the following prerequisites are true.
It was built considering an updated windows build with docker running, but will try to provide general instructions.

  - Basic coding knowledge
  - Basic Docker/Kubernetes knowledge
  - JDK 17 ( or Higher)
  - Maven 'Spring Boot is compatible with Apache Maven 3.5 or above'
  - Git/Github Desktop
  - NodeJS installed
  - Yarn installed
  - Docker Desktop


## Guide:
Let's begin local development install!

- ### Cloning the repository
    Clone the repository from the url below

        git clone https://github.com/eclipse-tractusx/demand-capacity-mgmt.git

    Checkout branch "fix/local-deployment-issue-fix"

- ### Open in your own IDE of choice
    Boot your IDE of choice and open the backend repo,
    add the specification as a module of the backend project.
    
    ![IntelliJ IDE](images/dev/2.png "resolving dependencies")

    ![IntelliJ IDE modules](images/dev/2_5.png "resolving dependencies")

- ### Clean maven modules and install dependencies: 
   ```
   mvn clean && mvn install
   ```
   
   If it fails saying you don't have a JDK, choose JDK17 of your choice.


- ### Running containers
  In the root directory of your project, run:
  ```sh
  docker compose up
  ``` 
  You should get 2 containers running, one for keycloak and one for postgresql database.


- ## Run the project
   Running the project for the first time will run the migrations, which will create the projects schema.

   Connect to the database with credentials defined in compose.yml, and run the follwoing sql queries:
   ```sql
   INSERT INTO "public"."company_base_data" ("id", "bpn", "company_name", "street", "number", "zip_code", "country", "my_company", "edc_url", "counter") VALUES ('377d1583-0fbd-468c-93f9-90dd7d994f79', '', 's1seven', 'random', '2', '1030', 'Austria', '', '', 1);
   
   INSERT INTO "public"."dcm_users" ("id", "name", "last_name", "email", "username", "company_id", "role") VALUES ('51d8bd26-e699-4bdc-b453-0422a671631c', '', '', '', 'dcm_admin', '377d1583-0fbd-468c-93f9-90dd7d994f79', 'ADMIN');
   ```

- ### Fetching the keycloak client credential and remove required actions
  Connect to keycloak using credentuals specified in compose.yml file.
  In clients tab, navigate to dcmauth client and copy the client secret under credentials.
  Open your application.yaml and place it on keycloak -> clientSecret field.

  Additionaly, go to **Users** tab, click on user "dcm_admin", and in "Details" tab, remove any "required actions" (otherwise, you won't be ale to login...) --> click "Save"

  After that, reboot the project and in postman you should be able to login on the token endpoint with the credentials from keycloak:
  	- username: dcm_admin
	- password: admin

  ![Postman](images/dev/6.png "Postman login")

- ### Configure postman collection requests!
  for the other requests on postman you need to alter the authorization tab.
  check the config on the images provided.

  the access token url should be either the backend or in last resort if it fails, this one 
  **http://localhost:8888/auth/realms/dcm/protocol/openid-connect/token** 
  if an authorization error occurs, it most likely is the url error of keycloak, newer versions of keycloak you need to remove **/auth/** from the authorization url.

  ![Postman](images/dev/7.png "Postman config")

  ![Postman](images/dev/8.png "Postman config")

  ![Postman](images/dev/9.png "Postman config")

  ![Postman](images/dev/10.png "Postman config")
 

- ### Run the front-end
  when postman is working, you need to open the front end on your IDE of choice and run on a terminal inside the front-end folder, make sure you have NodeJS installed on your machine.

      npm install --force --legacy-peer-deps

      npm start

  the app will be booted on localhost:3000

  for a user to correctly login you need to add a company to the DB and add that company to the user
  Admin needs to have a company, even if a dummy one.
  otherwise you will get lowerCase error on frontend when trying to read company Ids

## Postman Collection

[Download Postman collection](DCMFOSS_postman.json)


## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2022,2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2022,2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/demand-capacity-mgmt/
