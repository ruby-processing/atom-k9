---
layout: page
title: About
permalink: /about/
---

This package enables watch mode to be run from the [Atom editor][atom]. Much inspiration and some ideas stolen from [Ben Bleikamp][atom-processing], which was created in coffeescript as was the first version of this package. But you can't stand still, and the atom crew are moving away from coffeescript in favor of supporting the latest javascript (albeit using babel for backwards compatability).  I'm no expert on any of this but I managed to translate coffeescript to javascript using [decaffeinate][decaffeinate] (_to be fair I did not use the repl_) and it still works.

The standout feature of [JRubyArt][jruby_art] is the watch mode (leaves processing for dead) as does the gorgeous [Atom editor][atom] _cf_ the [processing ide][ide] which is emphatically late 20th century. Hell I'm even composing this with the atom editor with adjacent preview of the rendered markdown.

[JRubyArt][jruby_art] is a ruby wrapper for [processing-3.2.1][processing]. Create processing sketches in ruby using regular ruby-2.3 syntax, and use the magic [JRuby][jruby] to run them. You can use both rubygems and and regular processing libraries in your sketches.

[decaffeinate]:http://decaffeinate-project.org/repl/
[processing]: https://processing.org
[atom-processing]: https://github.com/bleikamp/processing
[jruby]: https://jruby.org
[jruby_art]: https://github.com/ruby-processing/JRubyArt
[atom]:https://atom.io/
[ide]:https://processing.org/reference/environment/
