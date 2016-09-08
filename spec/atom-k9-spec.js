'use babel';

import JRubyArt from '../lib/atom-k9';

describe "when a test is written", ->
  it "has some expectations that should pass", ->
    expect("apples").toEqual("apples")
    expect("oranges").not.toEqual("apples")
