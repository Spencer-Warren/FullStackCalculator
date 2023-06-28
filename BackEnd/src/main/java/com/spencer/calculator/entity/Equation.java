package com.spencer.calculator.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Equation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int equationID;
    private String equationString;
    private String solution;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "userID")
    private User user;
}
