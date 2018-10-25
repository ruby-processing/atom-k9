'use babel';

import { CompositeDisposable, BufferedProcess } from 'atom';
import fs from 'fs';
import path from 'path';
import JRubyArtView from './atom-k9-view';

export default {
  config: {
    'atom-k9-executable': {
      type:"string",
      default:"k9"
    }
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-k9:run': () => this.runSketch("--run"),
      'atom-k9:watch': () => this.runSketch("--watch"),
      'atom-k9:close': () => this.closeSketch()
    }));
  },

  deactivate(){
    this.subscriptions.dispose();
  },

  runSketch(cmd) {
    const file = atom.workspace.getActiveTextEditor().getPath();
    const command = path.normalize(atom.config.get("atom-k9.atom-k9-executable"));
    let dummy = [cmd, path.resolve(".atom/packages/atom-k9/examples/", "atom_test.rb")];
    let args = file ? [cmd, file] : dummy;
    let options = {};
    let stdout = output => this.display(output);
    let stderr = output => this.display(output);
    let exit = code => console.log(`Error code: ${code}`);
    if (!this.view) {
      this.view = new JRubyArtView();
      atom.workspace.addBottomPanel({item: this.view});
    }
    this.display(`Running command ${command} ${args.join(' ')}`);
    this.process = new BufferedProcess({command, args, stdout, stderr, exit});
  },


  display(line) {
    this.view.log(line);
  },

  closeSketch() {
    if (this.view) {
      this.process.kill();
      this.view.clear();
    }
  }
};
