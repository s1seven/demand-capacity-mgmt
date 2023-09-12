/*
 *  *******************************************************************************
 *  Copyright (c) 2023 BMW AG
 *  Copyright (c) 2023 Contributors to the Eclipse Foundation
 *
 *    See the NOTICE file(s) distributed with this work for additional
 *    information regarding copyright ownership.
 *
 *    This program and the accompanying materials are made available under the
 *    terms of the Apache License, Version 2.0 which is available at
 *    https://www.apache.org/licenses/LICENSE-2.0.
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *    License for the specific language governing permissions and limitations
 *    under the License.
 *
 *    SPDX-License-Identifier: Apache-2.0
 *    ********************************************************************************
 */

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CapacityGroup } from '../interfaces/capacitygroup_interfaces';

interface CapacityGroupContextData {
  capacitygroups: CapacityGroup[];
  GetCapacityGroup: (id: string) => Promise<CapacityGroup>;
}

export const CapacityGroupContext = createContext<CapacityGroupContextData | undefined>(undefined);

const CapacityGroupsProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {

  const [capacitygroups, setCapacityGroups] = useState<CapacityGroup[]>([]);

  useEffect(() => {
    const fetchCapacityGroups = async () => {
      try {
        const response = await axios.get('/capacityGroup', {});
        const result: CapacityGroup[] = response.data;
        setCapacityGroups(result);
      } catch (error) {
        console.error('Error fetching capacitygroups:', error);
      }
    };
  
    fetchCapacityGroups();
  }, []);

  const GetCapacityGroup = async (id: string): Promise<CapacityGroup> => {
    try {
      const response = await axios.get(`/capacityGroup/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching capacity group with id ${id}:`, error);
      throw error;
    }
  };
  
  return ( 
    <CapacityGroupContext.Provider value={{capacitygroups, GetCapacityGroup}}>
      {props.children}
    </CapacityGroupContext.Provider>
  );
};

export default CapacityGroupsProvider;
