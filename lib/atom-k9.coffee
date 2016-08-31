{CompositeDisposable, BufferedProcess} = require 'atom'
fs = require 'fs'
path = require 'path'
psTree = require 'ps-tree'
JRubyArtView = require './atom-k9-view'

module.exports = JRubyArt =
  config:
    'atom-k9-executable':
      type:"string",
      default:"k9"

  activate: (state) ->
    atom.commands.add 'atom-workspace', 'atom-k9:run': =>
      @runSketch("--run")
    atom.commands.add 'atom-workspace', 'atom-k9:watch': =>
      @runSketch("--watch")
    atom.commands.add 'atom-workspace', 'atom-k9:close': =>
      @closeSketch()

  runSketch: (cmd) ->
    console.log("watch sketch")
    editor  = atom.workspace.getActivePaneItem()
    file    = editor?.buffer.file
    command = path.normalize(atom.config.get("atom-k9.atom-k9-executable"))
    dummy = [cmd, path.resolve(".atom/packages/atom-k9/examples/", "atom_test.rb")]
    args = if file then [cmd, file.getPath()] else dummy
    options = {}
    console.log("Running command #{command} #{args.join(' ')}")
    stdout = (output) => @display output
    stderr = (output) => @display output
    exit = (code) ->
      console.log("Error code: #{code}")
    if !@view
      @view = new JRubyArtView
      atom.workspace.addBottomPanel(item: @view)
    if @process
      psTree @process.process.pid, (err, children) =>
        for child in children
          process.kill(child.PID)
      @view.clear()
    @process = new BufferedProcess({command, args, stdout, stderr, exit})


  display: (line) ->
    @view.log(line)

  closeSketch: ->
    if @view
      @view.clear()
