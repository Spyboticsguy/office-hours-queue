import crypto from "crypto";
import parse, { Parser } from "csv-parse";
import { Student } from "../App";

export default class Authentication {
  private studentDB: {[hashedID: string]: any};
  constructor() {
    const newStudentDB: {[hashedID: string]: any} = {};
    const parser = parse({
      columns: true,
    }).on(
      "readable",
      function(this: Parser) {
        let entry = this.read();
        while (entry) {
          newStudentDB[entry.hashed_id] = entry;
          entry = this.read();
        }
      },
    );

    // parse CSV from input
    parser.write(`name,hashed_id,role,email,image_url
Iron Man,70aa2c46623c0ca977dd873f995f805ac3e2ce989f60a7ccaea61c1d6488109943a23941d046a1333b307510ed04b6dd6d2199011e45faca3fe249c6b315ebd4,Teacher,tstark3@gatech.edu,NONE
Captain America,cf670385ee1def40d166f653ebc7b9d76c6232f4f85b8a1556555b2b520070e18f354a27f036fd6958b1e9a220cce10a6b04c651d9dbb42035016d79af69e2c6,T.A.,srogers3@gatech.edu,NONE
The Incredible Hulk,3159d32c67595595b2758658aec50bfa5585477f2ec728be06f78ca23a68ba52d11d7ac864bcf208e95e1b1fd7ed7054e64aea77329b36b1466a411360d99448,T.A.,bbanner3@gatech.edu,NONE
The Mighty Thor,12b61fa20b9dc33bdf337a2e99ad48ac16ccd6bce0a8e08b7a3d3a6daed8bb2aa934ea5a50e90a60ff7efa8a0f482b718f34a4a7f1ca082a37845e658ecb4eaa,T.A.,todinson3@gatech.edu,NONE
Black Widow,95fc6d4dc0e3e2e914494dfd31ab5bb3786cb4b01f989f364bf8c9f4b22a4d1813acb4b655c842bf81ae6fe937213c86d620330270f01a7886df2ad280528777,T.A.,todinson3@gatech.edu,NONE
Hawkeye,0bbf688065ee1aa1714ef35af53889c7e0ef1cf3241f22a5f627ba5b238e88b0ef402b67200af67164d3df0ab587ef4cbcceb05427d05cd4f30748864a98cd1a,T.A.,todinson3@gatech.edu,NONE
Fake Student,7eca7832db74b33d9fcaab349a02776b6cf0803e067f122f65b9c86778035068b16af2ee7aa562b89e4ac1e57a84cc8ae9a39ae205fe2fd468962c567ff751c1,student,,
Deb Banerji,998a4859a383d60fa7059e0140f8456a6230acb201d9f19f7da9db78025d33804606ecbbcd22d9a59fc93f323153d7c185d705509cc660a2134a85683eaa4115,student,,`);
    parser.end();

    this.studentDB = newStudentDB;
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
