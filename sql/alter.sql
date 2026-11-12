-- FOREIGN KEYS

ALTER TABLE Club ADD CONSTRAINT Club_Place_FK FOREIGN KEY (Place_placeKey) REFERENCES Place (placeKey);

ALTER TABLE Email ADD CONSTRAINT Email_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey) ON DELETE CASCADE;

ALTER TABLE IdentityDocument ADD CONSTRAINT IdentityDocument_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey) ON DELETE CASCADE;

ALTER TABLE Match ADD CONSTRAINT Match_TournamentStage_FK FOREIGN KEY (TournamentStage_tournamentStageKey) REFERENCES TournamentStage (tournamentStageKey) ON DELETE CASCADE;

ALTER TABLE Participation ADD CONSTRAINT Participation_Double_FK FOREIGN KEY (Double_doubleKey) REFERENCES Double (doubleKey) ON DELETE CASCADE;
ALTER TABLE Participation ADD CONSTRAINT Participation_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey) ON DELETE CASCADE;
ALTER TABLE Participation ADD CONSTRAINT Participation_Tournament_FK FOREIGN KEY (Tournament_tourKey) REFERENCES Tournament (tourKey) ON DELETE CASCADE;

ALTER TABLE Account ADD CONSTRAINT Account_Player_FK FOREIGN KEY (player_profilekey) REFERENCES Player(profilekey) ON DELETE CASCADE;

ALTER TABLE Payment ADD CONSTRAINT Payment_PaymentMethod_FK FOREIGN KEY (PaymentMethod_payMetKey) REFERENCES PaymentMethod (payMetKey) ON DELETE CASCADE;
ALTER TABLE Payment ADD CONSTRAINT Payment_Account_FK FOREIGN KEY (Account_accountKey) REFERENCES Account (accountKey) ON DELETE CASCADE;

ALTER TABLE Charge ADD CONSTRAINT Charge_Product_FK FOREIGN KEY (product_productkey) REFERENCES Product(productkey) ON DELETE CASCADE;
ALTER TABLE Charge ADD CONSTRAINT Charge_Participation_FK FOREIGN KEY (participation_parkey) REFERENCES participation(parkey) ON DELETE CASCADE;
ALTER TABLE Charge ADD CONSTRAINT Charge_Account_FK FOREIGN KEY (Account_accountKey) REFERENCES Account (accountKey) ON DELETE CASCADE;


ALTER TABLE PaymentAllocation ADD CONSTRAINT PaymentAllocation_Payment_FK FOREIGN KEY (Payment_paymentKey) REFERENCES payment(paymentkey) ON DELETE CASCADE;
ALTER TABLE PaymentAllocation ADD CONSTRAINT PaymentAllocation_Charge_FK FOREIGN KEY (Charge_chargeKey) REFERENCES charge(chargeKey) ON DELETE CASCADE;

ALTER TABLE PlayerStatus ADD CONSTRAINT PlayerStatus_Player_FK FOREIGN KEY (player_profilekey) REFERENCES Player (profilekey) ON DELETE CASCADE;
ALTER TABLE PlayerStatus ADD CONSTRAINT PlayerStatus_Status_FK FOREIGN KEY (status_statuskey) REFERENCES Status (statuskey) ON DELETE CASCADE;

ALTER TABLE phone ADD CONSTRAINT phone_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey) ON DELETE CASCADE;

ALTER TABLE Pitch ADD CONSTRAINT Pitch_Club_FK FOREIGN KEY (Club_clubKey) REFERENCES Club (clubKey);
ALTER TABLE Pitch ADD CONSTRAINT Pitch_Place_FK FOREIGN KEY (Place_placeKey) REFERENCES Place (placeKey);

ALTER TABLE PitchMatch ADD CONSTRAINT PitchMatch_Match_FK FOREIGN KEY (Match_matchKey) REFERENCES Match (matchKey) ON DELETE CASCADE;
ALTER TABLE PitchMatch ADD CONSTRAINT PitchMatch_Pitch_FK FOREIGN KEY (Pitch_pitchKey) REFERENCES Pitch (pitchKey);

ALTER TABLE Place ADD CONSTRAINT Place_Place_FK FOREIGN KEY (Place_placeKey) REFERENCES Place (placeKey);
ALTER TABLE Player ADD CONSTRAINT Player_Place_FK FOREIGN KEY (Place_placeKey) REFERENCES Place (placeKey);

ALTER TABLE PlayerClub ADD CONSTRAINT PlayerClub_Club_FK FOREIGN KEY (Club_clubKey) REFERENCES Club (clubKey) ON DELETE CASCADE;
ALTER TABLE PlayerClub ADD CONSTRAINT PlayerClub_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey) ON DELETE CASCADE;

ALTER TABLE PlayerDouble ADD CONSTRAINT PlayerDouble_Double_FK FOREIGN KEY (Double_doubleKey) REFERENCES Double (doubleKey) ON DELETE CASCADE;
ALTER TABLE PlayerDouble ADD CONSTRAINT PlayerDouble_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey) ON DELETE CASCADE;

ALTER TABLE PlayerMatch ADD CONSTRAINT PlayerMatch_Double_FK FOREIGN KEY (Double_doubleKey) REFERENCES Double (doubleKey) ON DELETE CASCADE;
ALTER TABLE PlayerMatch ADD CONSTRAINT PlayerMatch_Match_FK FOREIGN KEY (Match_matchKey) REFERENCES Match (matchKey) ON DELETE CASCADE;
ALTER TABLE PlayerMatch ADD CONSTRAINT PlayerMatch_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey) ON DELETE CASCADE;

ALTER TABLE PlayerTennisCategory ADD CONSTRAINT PlayerTennisCategory_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey) ON DELETE CASCADE;
ALTER TABLE PlayerTennisCategory ADD CONSTRAINT PlayerTennisCategory_TennisCategory_FK FOREIGN KEY (TennisCategory_catKey) REFERENCES TennisCategory (catKey) ON DELETE CASCADE;

ALTER TABLE RecordStatusMatch ADD CONSTRAINT RecordStatusMatch_Match_FK FOREIGN KEY (Match_matchKey) REFERENCES Match (matchKey) ON DELETE CASCADE;
ALTER TABLE RecordStatusMatch ADD CONSTRAINT RecordStatusMatch_MatchStatus_FK FOREIGN KEY (MatchStatus_matchStatusKey) REFERENCES MatchStatus (matchStatusKey);

ALTER TABLE Set ADD CONSTRAINT Set_Match_FK FOREIGN KEY (Match_matchKey) REFERENCES Match (matchKey) ON DELETE CASCADE;

ALTER TABLE Stats ADD CONSTRAINT Stats_Participation_FK FOREIGN KEY (Participation_parKey) REFERENCES Participation (parKey) ON DELETE CASCADE;
ALTER TABLE Stats ADD CONSTRAINT Stats_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey) ON DELETE CASCADE;

ALTER TABLE TennisCategory ADD CONSTRAINT TennisCategory_Ranking_FK FOREIGN KEY (Ranking_rankingKey) REFERENCES Ranking (rankingKey);

ALTER TABLE Tournament ADD CONSTRAINT Tournament_TennisCategory_FK FOREIGN KEY (TennisCategory_catKey) REFERENCES TennisCategory (catKey);

ALTER TABLE TournamentStage ADD CONSTRAINT TournamentStage_Tournament_FK FOREIGN KEY (Tournament_tourKey) REFERENCES Tournament (tourKey) ON DELETE CASCADE;
ALTER TABLE TournamentStage ADD CONSTRAINT TournamentStage_TournamentStage_FK FOREIGN KEY (TournamentStage_tournamentStageKey) REFERENCES TournamentStage (tournamentStageKey) ON DELETE CASCADE;

ALTER TABLE Verification ADD CONSTRAINT Verification_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey) ON DELETE CASCADE;

ALTER TABLE Profile ADD CONSTRAINT Profile_Email_FK FOREIGN KEY (Email_EmailKey) REFERENCES Email (emailKey) ON DELETE CASCADE;
ALTER TABLE Profile ADD CONSTRAINT Profile_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey) ON DELETE CASCADE;