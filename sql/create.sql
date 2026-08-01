

-- Club
CREATE TABLE Club (
     clubKey        INT NOT NULL,
     clubName       VARCHAR(100) NOT NULL,
     Place_placeKey INT NOT NULL,
     CONSTRAINT Club_PK PRIMARY KEY (clubKey)
);

-- Double
CREATE TABLE Double (
     doubleKey INT NOT NULL,
     CONSTRAINT Double_PK PRIMARY KEY (doubleKey)
);

-- Email
CREATE TABLE Email (
     emailKey          INT NOT NULL,
     username          VARCHAR(100) NOT NULL,
     atSymbol          VARCHAR(5),
     domainName        VARCHAR(100) NOT NULL,
     Player_profileKey INT NOT NULL,
     CONSTRAINT Email_PK PRIMARY KEY (emailKey)
);

-- IdentityDocument
CREATE TABLE IdentityDocument (
     docKey            INT NOT NULL,
     type              VARCHAR(50) NOT NULL,
     docNumber         VARCHAR(50) NOT NULL,
     Player_profileKey INT NOT NULL,
     CONSTRAINT IdentityDocument_PK PRIMARY KEY (docKey)
);
CREATE UNIQUE INDEX IdentityDocument__IDX ON IdentityDocument (Player_profileKey ASC);

-- Match
CREATE TABLE Match (
     matchKey                           INT NOT NULL,
     TournamentStage_tournamentStageKey INT NOT NULL,
     CONSTRAINT Match_PK PRIMARY KEY (matchKey)
);

-- MatchStatus
CREATE TABLE MatchStatus (
     matchStatusKey    INT NOT NULL,
     statusName        VARCHAR(50) NOT NULL,
     statusDescription TEXT,
     CONSTRAINT MatchStatus_PK PRIMARY KEY (matchStatusKey)
);

-- Participation
CREATE TABLE Participation (
     parKey             INT NOT NULL,
     startDate          TIMESTAMP,
     endUpdate          TIMESTAMP,
     Tournament_tourKey INT NOT NULL,
     tournamentAmount   NUMERIC(10,2) NOT NULL,
     Player_profileKey  INT NOT NULL,
     Double_doubleKey   INT NOT NULL,
     CONSTRAINT Participation_PK PRIMARY KEY (parKey, Tournament_tourKey)
);

-- Payment
CREATE TABLE Payment (
     paymentKey                       INT NOT NULL,
     paymentAmount                    NUMERIC(10,2) NOT NULL,
     paymentDate                      TIMESTAMP NOT NULL,
     Participation_parKey             INT NOT NULL,
     Participation_Tournament_tourKey INT NOT NULL,
     PaymentMethod_payMetKey          INT NOT NULL,
     bolivarExchange                  NUMERIC(10,2) NOT NULL,
     transmitter                      VARCHAR(100) NOT NULL,
     receptor                         VARCHAR(100) NOT NULL,
     badge                            VARCHAR(50) NOT NULL,
     CONSTRAINT Payment_PK PRIMARY KEY (paymentKey, Participation_parKey, Participation_Tournament_tourKey, PaymentMethod_payMetKey)
);

-- PaymentMethod
CREATE TABLE PaymentMethod (
     payMetKey  INT NOT NULL,
     typeMethod VARCHAR(50) NOT NULL,
     CONSTRAINT PaymentMethod_PK PRIMARY KEY (payMetKey)
);

-- phone
CREATE TABLE phone (
     phoneKey          INT NOT NULL,
     areaCode          VARCHAR(10) NOT NULL,
     operatorCode      VARCHAR(10) NOT NULL,
     phoneNumber       VARCHAR(20) NOT NULL,
     Player_profileKey INT NOT NULL,
     CONSTRAINT phone_PK PRIMARY KEY (phoneKey)
);

-- Pitch
CREATE TABLE Pitch (
     pitchKey       INT NOT NULL,
     pitchNumber    INT NOT NULL,
     description    TEXT,
     direction      TEXT,
     Place_placeKey INT NOT NULL,
     Club_clubKey   INT NOT NULL,
     CONSTRAINT Pitch_PK PRIMARY KEY (pitchKey)
);

-- PitchMatch
CREATE TABLE PitchMatch (
     datePitchMatch TIMESTAMP NOT NULL,
     Pitch_pitchKey INT NOT NULL,
     Match_matchKey INT NOT NULL,
     name           VARCHAR(100) NOT NULL,
     price          NUMERIC(10,2) NOT NULL,
     CONSTRAINT PitchMatch_PK PRIMARY KEY (datePitchMatch, Pitch_pitchKey, Match_matchKey)
);

-- Place
CREATE TABLE Place (
     placeKey       INT NOT NULL,
     type           VARCHAR(50) NOT NULL,
     name           VARCHAR(100) NOT NULL,
     Place_placeKey INT NOT NULL,
     CONSTRAINT Place_PK PRIMARY KEY (placeKey)
);

-- Player
CREATE TABLE Player (
     profileKey     INT NOT NULL,
     firstName      VARCHAR(50) NOT NULL,
     secondName     VARCHAR(50),
     firstLastname  VARCHAR(50) NOT NULL,
     secondLastname VARCHAR(50),
     birthday       DATE,
     sex            VARCHAR(10) NOT NULL,
     photoOne       TEXT,
     photoTwo       TEXT,
     Place_placeKey INT NOT NULL,
     CONSTRAINT Player_PK PRIMARY KEY (profileKey)
);

-- PlayerClub
CREATE TABLE PlayerClub (
     playerClubKey     INT NOT NULL,
     Player_profileKey INT NOT NULL,
     Club_clubKey      INT NOT NULL,
     CONSTRAINT PlayerClub_PK PRIMARY KEY (playerClubKey, Player_profileKey, Club_clubKey)
);

-- PlayerDouble
CREATE TABLE PlayerDouble (
     Player_profileKey INT NOT NULL,
     Double_doubleKey  INT NOT NULL,
     CONSTRAINT PlayerDouble_PK PRIMARY KEY (Player_profileKey, Double_doubleKey)
);

-- PlayerMatch (Incluye la PK y la restricción de ARCO como CHECK)
CREATE TABLE PlayerMatch (
     matchDate         TIMESTAMP NOT NULL,
     Match_matchKey    INT NOT NULL,
     Double_doubleKey  INT,
     Player_profileKey INT,
     CONSTRAINT PlayerMatch_PK PRIMARY KEY (Match_matchKey),
     CONSTRAINT Arc_Player_Double_Check CHECK (
        ((Double_doubleKey IS NOT NULL) AND (Player_profileKey IS NULL)) OR
        ((Player_profileKey IS NOT NULL) AND (Double_doubleKey IS NULL))
     )
);

-- PlayerTennisCategory
CREATE TABLE PlayerTennisCategory (
     PlaTenCatKey                     INT NOT NULL,
     Player_profileKey                INT NOT NULL,
     TennisCategory_TennisCategory_ID INT NOT NULL,
     CONSTRAINT PlayerTennisCategory_PK PRIMARY KEY (PlaTenCatKey, Player_profileKey)
);

-- Ranking
CREATE TABLE Ranking (
     rankingKey INT NOT NULL,
     name       VARCHAR(100) NOT NULL,
     CONSTRAINT Ranking_PK PRIMARY KEY (rankingKey)
);

-- RecordStatusMatch
CREATE TABLE RecordStatusMatch (
     recordStatusMatchKey       INT NOT NULL,
     dateRecordStatusMatch      TIMESTAMP NOT NULL,
     MatchStatus_matchStatusKey INT NOT NULL,
     Match_matchKey             INT NOT NULL,
     CONSTRAINT RecordStatusMatch_PK PRIMARY KEY (recordStatusMatchKey, MatchStatus_matchStatusKey, Match_matchKey)
);

-- Set
CREATE TABLE Set (
     setKey         INT NOT NULL,
     setNumber      INT NOT NULL,
     gamesPlayerOne INT NOT NULL,
     gamesPlayerTwo INT NOT NULL,
     tieBreak       BOOLEAN,
     tiePlayerOne   INT,
     tiePlayerTwo   INT,
     Match_matchKey INT NOT NULL,
     superTieBreak  BOOLEAN,
     CONSTRAINT Set_PK PRIMARY KEY (setKey)
);

-- Stats
CREATE TABLE Stats (
     statsKey                         INT NOT NULL,
     matchesPlayed                    INT NOT NULL,
     matchesWon                       INT NOT NULL,
     matchesLost                      INT NOT NULL,
     averageMatchesWon                NUMERIC(5,2) NOT NULL,
     setsWon                          INT NOT NULL,
     setsLost                         INT NOT NULL,
     averageSetsWon                   NUMERIC(5,2) NOT NULL,
     gamesWon                         INT NOT NULL,
     gamesLost                        INT NOT NULL,
     averageGamesWon                  NUMERIC(5,2) NOT NULL,
     Player_profileKey                INT NOT NULL,
     Participation_parKey             INT NOT NULL,
     Participation_Tournament_tourKey INT NOT NULL,
     CONSTRAINT Stats_PK PRIMARY KEY (statsKey)
);
CREATE UNIQUE INDEX Stats__IDX ON Stats (Player_profileKey ASC);
CREATE UNIQUE INDEX Stats__IDXv1 ON Stats (Participation_parKey ASC, Participation_Tournament_tourKey ASC);

-- TennisCategory
CREATE TABLE TennisCategory (
     catKey             INT NOT NULL,
     categoryName       VARCHAR(100) NOT NULL,
     description        TEXT,
     type               VARCHAR(50),
     Ranking_rankingKey INT NOT NULL,
     TennisCategory_ID  INT NOT NULL,
     CONSTRAINT TennisCategory_PK PRIMARY KEY (TennisCategory_ID)
);

-- Tournament
CREATE TABLE Tournament (
     tourKey                          INT NOT NULL,
     tourName                         VARCHAR(100) NOT NULL,
     tourDescription                  TEXT,
     startDate                        TIMESTAMP,
     endDate                          TIMESTAMP,
     TennisCategory_TennisCategory_ID INT NOT NULL,
     CONSTRAINT Tournament_PK PRIMARY KEY (tourKey)
);

-- TournamentStage
CREATE TABLE TournamentStage (
     tournamentStageKey                 INT NOT NULL,
     tournamentStageType                VARCHAR(50) NOT NULL,
     name                               VARCHAR(100) NOT NULL,
     TournamentStage_tournamentStageKey INT NOT NULL,
     Participation_parKey               INT NOT NULL,
     Participation_Tournament_tourKey   INT NOT NULL,
     CONSTRAINT TournamentStage_PK PRIMARY KEY (tournamentStageKey)
);

-- Verification
CREATE TABLE Verification (
     verificationKey   INT NOT NULL,
     verificationDate  TIMESTAMP NOT NULL,
     Player_profileKey INT NOT NULL,
     CONSTRAINT Verification_PK PRIMARY KEY (verificationKey)
);

CREATE TABLE Profile (
     profileKey INT NOT NULL,
     profileName VARCHAR(200) NOT NULL,
     creationDate TIMESTAMP,
     profileHashPassword TEXT,
     Email_EmailKey INT NOT NULL,
     Player_profileKey INT,

     CONSTRAINT Profile_PK PRIMARY KEY (profileKey)
);

ALTER TABLE Club ADD CONSTRAINT Club_Place_FK FOREIGN KEY (Place_placeKey) REFERENCES Place (placeKey);
ALTER TABLE Email ADD CONSTRAINT Email_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey);
ALTER TABLE IdentityDocument ADD CONSTRAINT IdentityDocument_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey);
ALTER TABLE Match ADD CONSTRAINT Match_TournamentStage_FK FOREIGN KEY (TournamentStage_tournamentStageKey) REFERENCES TournamentStage (tournamentStageKey);
ALTER TABLE Participation ADD CONSTRAINT Participation_Double_FK FOREIGN KEY (Double_doubleKey) REFERENCES Double (doubleKey);
ALTER TABLE Participation ADD CONSTRAINT Participation_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey);
ALTER TABLE Participation ADD CONSTRAINT Participation_Tournament_FK FOREIGN KEY (Tournament_tourKey) REFERENCES Tournament (tourKey);
ALTER TABLE Payment ADD CONSTRAINT Payment_Participation_FK FOREIGN KEY (Participation_parKey, Participation_Tournament_tourKey) REFERENCES Participation (parKey, Tournament_tourKey);
ALTER TABLE Payment ADD CONSTRAINT Payment_PaymentMethod_FK FOREIGN KEY (PaymentMethod_payMetKey) REFERENCES PaymentMethod (payMetKey);
ALTER TABLE phone ADD CONSTRAINT phone_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey);
ALTER TABLE Pitch ADD CONSTRAINT Pitch_Club_FK FOREIGN KEY (Club_clubKey) REFERENCES Club (clubKey);
ALTER TABLE Pitch ADD CONSTRAINT Pitch_Place_FK FOREIGN KEY (Place_placeKey) REFERENCES Place (placeKey);
ALTER TABLE PitchMatch ADD CONSTRAINT PitchMatch_Match_FK FOREIGN KEY (Match_matchKey) REFERENCES Match (matchKey);
ALTER TABLE PitchMatch ADD CONSTRAINT PitchMatch_Pitch_FK FOREIGN KEY (Pitch_pitchKey) REFERENCES Pitch (pitchKey);
ALTER TABLE Place ADD CONSTRAINT Place_Place_FK FOREIGN KEY (Place_placeKey) REFERENCES Place (placeKey);
ALTER TABLE Player ADD CONSTRAINT Player_Place_FK FOREIGN KEY (Place_placeKey) REFERENCES Place (placeKey);
ALTER TABLE PlayerClub ADD CONSTRAINT PlayerClub_Club_FK FOREIGN KEY (Club_clubKey) REFERENCES Club (clubKey);
ALTER TABLE PlayerClub ADD CONSTRAINT PlayerClub_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey);
ALTER TABLE PlayerDouble ADD CONSTRAINT PlayerDouble_Double_FK FOREIGN KEY (Double_doubleKey) REFERENCES Double (doubleKey);
ALTER TABLE PlayerDouble ADD CONSTRAINT PlayerDouble_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey);
ALTER TABLE PlayerMatch ADD CONSTRAINT PlayerMatch_Double_FK FOREIGN KEY (Double_doubleKey) REFERENCES Double (doubleKey);
ALTER TABLE PlayerMatch ADD CONSTRAINT PlayerMatch_Match_FK FOREIGN KEY (Match_matchKey) REFERENCES Match (matchKey);
ALTER TABLE PlayerMatch ADD CONSTRAINT PlayerMatch_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey);
ALTER TABLE PlayerTennisCategory ADD CONSTRAINT PlayerTennisCategory_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey);
ALTER TABLE PlayerTennisCategory ADD CONSTRAINT PlayerTennisCategory_TennisCategory_FK FOREIGN KEY (TennisCategory_TennisCategory_ID) REFERENCES TennisCategory (TennisCategory_ID);
ALTER TABLE RecordStatusMatch ADD CONSTRAINT RecordStatusMatch_Match_FK FOREIGN KEY (Match_matchKey) REFERENCES Match (matchKey);
ALTER TABLE RecordStatusMatch ADD CONSTRAINT RecordStatusMatch_MatchStatus_FK FOREIGN KEY (MatchStatus_matchStatusKey) REFERENCES MatchStatus (matchStatusKey);
ALTER TABLE Set ADD CONSTRAINT Set_Match_FK FOREIGN KEY (Match_matchKey) REFERENCES Match (matchKey);
ALTER TABLE Stats ADD CONSTRAINT Stats_Participation_FK FOREIGN KEY (Participation_parKey, Participation_Tournament_tourKey) REFERENCES Participation (parKey, Tournament_tourKey);
ALTER TABLE Stats ADD CONSTRAINT Stats_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey);
ALTER TABLE TennisCategory ADD CONSTRAINT TennisCategory_Ranking_FK FOREIGN KEY (Ranking_rankingKey) REFERENCES Ranking (rankingKey);
ALTER TABLE Tournament ADD CONSTRAINT Tournament_TennisCategory_FK FOREIGN KEY (TennisCategory_TennisCategory_ID) REFERENCES TennisCategory (TennisCategory_ID);
ALTER TABLE TournamentStage ADD CONSTRAINT TournamentStage_Participation_FK FOREIGN KEY (Participation_parKey, Participation_Tournament_tourKey) REFERENCES Participation (parKey, Tournament_tourKey);
ALTER TABLE TournamentStage ADD CONSTRAINT TournamentStage_TournamentStage_FK FOREIGN KEY (TournamentStage_tournamentStageKey) REFERENCES TournamentStage (tournamentStageKey);
ALTER TABLE Verification ADD CONSTRAINT Verification_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey);
ALTER TABLE Profile ADD CONSTRAINT Profile_Email_FK FOREIGN KEY (Email_EmailKey) REFERENCES Email (emailKey);
ALTER TABLE Profile ADD CONSTRAINT Profile_Player_FK FOREIGN KEY (Player_profileKey) REFERENCES Player (profileKey);