import crypto from "crypto";
import XLSX from "xlsx";
import { Student } from "../App";

type StudentDatabase = {
  [hashedID: string]: DatabaseEntry,
};

type DatabaseEntry = {
  name: string,
  role: string,
  email: string,
  imageURL?: string,
};

export default class Authentication {
  private studentDB: StudentDatabase = {};

  public lookupStudent(GTID: number): Student | null {
    const hashedGTID = this.hashGTID(GTID);
    const student = this.studentDB[hashedGTID];
    if (student) {
      return {
        id: hashedGTID,
        name: student.name,
      };
    }
    return null;

  }

  public convertRosterToJson(inputRoster: File) {
    const reader = new FileReader();
    let rosterAsJson: StudentDatabase;
    reader.onloadend = () => {
      const roster = reader.result;
      const rosterAsSheet = XLSX.read(roster, {
        type: "binary",
      });
      rosterAsJson = this.parseJsonRoster(
        XLSX.utils.sheet_to_json(rosterAsSheet.Sheets[rosterAsSheet.SheetNames[0]]));
      this.downloadStudentRoster(rosterAsJson);
      this.studentDB = rosterAsJson;
    };
    reader.readAsBinaryString(inputRoster);
  }

  private downloadStudentRoster(roster: StudentDatabase) {
    const download = new Blob([JSON.stringify(roster)], {type: "text/json"});
    const url = window.URL.createObjectURL(download);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "roster.json");
    link.click();
  }

  private parseJsonRoster(roster: any[]): StudentDatabase {
    /* roster in XLSX format should be:
      [
        {
          Name: [name],
          Email: [email],
          GTID: [GTID],
          Role: [role],
          ...
        }
      ]
    */
    const newDatabase: StudentDatabase = {};
    // each entry in the array is a student.
    roster.forEach(value => {
      const hashedGTID = this.hashGTID(value.GTID);
      newDatabase[hashedGTID] = {
        email: value.Email,
        name: value.Name,
        role: value.Role,
      };
    }, this);
    return newDatabase;
  }

  private hashGTID(GTID: number): string {
    const hash = crypto.createHash("sha512");

    // hash GTID using SHA-512 encryption.
    hash.update(GTID.toString());
    return hash.digest("hex");
  }
}
