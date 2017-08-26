'use babel';

let JRubyArt;
import { CompositeDisposable, BufferedProcess } from 'atom';
import fs from 'fs';
import path from 'path';
import JRubyArtView from './atom-k9-view';

export default JRubyArt = {
  config: {
    'atom-k9-executable': {
      type:"string",
      default:"k9"
    }
  },

  activate(state) {
    let { commands } = atom;
    commands.add('atom-workspace', { ['atom-k9:run']: () => {
      this.runSketch("--run");
    }
  }
    );
    commands.add('atom-workspace', { ['atom-k9:watch']: () => {
      this.runSketch("--watch");
    }
  }
    );
    commands.add('atom-workspace', { ['atom-k9:close']: () => {
      this.closeSketch();
    }
  }
    );
  },

  runSketch(cmd) {
    console.log("watch sketch");
    const file = atom.workspace.getActiveTextEditor().getPath();
    const command = path.normalize(atom.config.get("atom-k9.atom-k9-executable"));
    let dummy = [cmd, path.resolve(".atom/packages/atom-k9/examples/", "atom_test.rb")];
    let args = file ? [cmd, file] : dummy;
    let options = {};
    console.log(`Running command ${command} ${args.join(' ')}`);
    let stdout = output => this.display(output);
    let stderr = output => this.display(output);
    let exit = code => console.log(`Error code: ${code}`);
    if (!this.view) {
      this.view = new JRubyArtView();
      atom.workspace.addBottomPanel({item: this.view});
    }
    this.process = new BufferedProcess({command, args, stdout, stderr, exit});
  },


  display(line) {
    this.view.log(line);
  },

  closeSketch() {
    if (this.view) {
      this.view.clear();
    }
  }
};
