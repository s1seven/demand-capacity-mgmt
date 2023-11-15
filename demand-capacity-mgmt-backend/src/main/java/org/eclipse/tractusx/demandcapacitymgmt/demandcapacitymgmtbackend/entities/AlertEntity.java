package org.eclipse.tractusx.demandcapacitymgmt.demandcapacitymgmtbackend.entities;

import jakarta.persistence.*;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.eclipse.tractusx.demandcapacitymgmt.demandcapacitymgmtbackend.entities.enums.AlertThresholdType;
import org.eclipse.tractusx.demandcapacitymgmt.demandcapacitymgmtbackend.entities.enums.AlertsMonitoredObjects;

@Entity
@Table(name = "alerts")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlertEntity {

    @Id
    //    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private UUID id;

    @Column(name = "user_id")
    private UUID userID;

    @Column(name = "alert_name")
    private String alertName;

    @Column(name = "monitored_objects")
    @Enumerated(EnumType.STRING)
    private AlertsMonitoredObjects monitoredObjects;

    @Column(name = "created")
    private String created;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private AlertThresholdType type;

    @Column(name = "threshold")
    private double threshold;

    @Column(name = "description")
    private String description;
}
