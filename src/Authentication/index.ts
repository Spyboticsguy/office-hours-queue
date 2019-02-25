import crypto from "crypto";

const exports = {
  hashGTID(GTID: number): string {
    const hash = crypto.createHash("sha512");

    // hash GTID using SHA-512 encryption.
    hash.update(GTID.toString());
    return hash.digest("hex");
  },
};

export default exports;
