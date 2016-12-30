import { fsA } from "stripA";
import { fkA } from "keepA";
import { fsB } from "stripBPattern";
import { fkB } from "keepBPattern";
fsB('foo');
fkB('foo');

import fsC from "stripC";
import fkC from "keepC";
console.log(fsC);
console.log(fkC);

import fsD from "stripDPattern";
import fkD from "keepDPattern";
const fsDVar = fsD;
const fkDVar = fkD;

import { fsEProxy as fsE } from "stripE";
import { fkEProxy as fkE } from "keepE";
import { fsFProxy as fsF } from "stripFPattern";
import { fkFProxy as fkF } from "keepFPattern";

import "stripG";
import "keepG";
import "stripHPattern";
import "keepHPattern";
