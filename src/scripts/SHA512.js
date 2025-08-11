/**
    {
        "api":1,
        "name":"SHA512 Hash",
        "description":"Computes the SHA512 hash of your text (Hex encoded)",
        "icon":"fingerprint",
        "tags":"strip,slashes,remove"
    }
**/

import Hashes from "jshashes";

export function main(state) {
  var hash = new Hashes.SHA512();
  state.text = hash.hex(state.text);
}
