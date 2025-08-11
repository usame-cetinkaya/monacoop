/**
	{
		"api":1,
		"name":"MD5 Checksum",
		"description":"Computes the checksum of your text (Hex encoded).",
		"author":"Ivan",
		"icon":"fingerprint",
		"tags":"strip,slashes,remove"
	}
**/

import Hashes from "jshashes";

export function main(state) {
  state.text = new Hashes.MD5().hex(state.text);
}
