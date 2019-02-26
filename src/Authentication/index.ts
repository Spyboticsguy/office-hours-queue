import crypto from "crypto";
import XLSX from "xlsx";
import { Student } from "../App";

export default class Authentication {
  private studentDB: {[hashedID: string]: any};
  constructor() {
    this.studentDB = JSON.parse(`{
      "70aa2c46623c0ca977dd873f995f805ac3e2ce989f60a7ccaea61c1d6488109943a23941d046a1333b307510ed04b6dd6d2199011e45faca3fe249c6b315ebd4": {
        "name": "Iron Man",
        "role": "Teacher",
        "email": "tstark3@gatech.edu",
        "imageURL": null
      },
      "cf670385ee1def40d166f653ebc7b9d76c6232f4f85b8a1556555b2b520070e18f354a27f036fd6958b1e9a220cce10a6b04c651d9dbb42035016d79af69e2c6": {
        "name": "Captain America",
        "role": "T.A.",
        "email": "srogers3@gatech.edu",
        "imageURL": null
      },
      "3159d32c67595595b2758658aec50bfa5585477f2ec728be06f78ca23a68ba52d11d7ac864bcf208e95e1b1fd7ed7054e64aea77329b36b1466a411360d99448": {
        "name": "The Incredible Hulk",
        "role": "T.A.",
        "email": "bbanner3@gatech.edu",
        "imageURL": null
      }
    }`);
  }

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

  private hashGTID(GTID: number): string {
    const hash = crypto.createHash("sha512");

    // hash GTID using SHA-512 encryption.
    hash.update(GTID.toString());
    return hash.digest("hex");
  }
}
