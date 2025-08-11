/**
    {
        "api":1,
        "name":"SHA1 Hash",
        "description":"Computes the SHA1 hash of your text (Hex encoded)",
        "icon":"fingerprint",
        "tags":"strip,slashes,remove"
    }
**/

import Hashes from "jshashes";

export function main(state) {
  var hash = new Hashes.SHA1();
  state.text = hash.hex(state.text);
}
