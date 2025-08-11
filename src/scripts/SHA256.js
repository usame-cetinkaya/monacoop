/**
    {
        "api":1,
        "name":"SHA256 Hash",
        "description":"Computes the SHA256 hash of your text (Hex encoded)",
        "icon":"fingerprint",
        "tags":"strip,slashes,remove"
    }
**/

import Hashes from "jshashes";

export function main(state) {
  var hash = new Hashes.SHA256();
  state.text = hash.hex(state.text);
}
