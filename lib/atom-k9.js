'use babel';

let JRubyArt;
import { CompositeDisposable, BufferedProcess } from 'atom';
import fs from 'fs';
import path from 'path';
import psTree from 'ps-tree';
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
      return this.runSketch("--run");
    }
  }
    );
    commands.add('atom-workspace', { ['atom-k9:watch']: () => {
      return this.runSketch("--watch");
    }
  }
    );
    return commands.add('atom-workspace', { ['atom-k9:close']: () => {
      return this.closeSketch();
    }
  }
    );
  },

  runSketch(cmd) {
    console.log("watch sketch");
    let editor  = atom.workspace.getActivePaneItem();
    let file    = __guard__(editor, x => x.buffer.file);
    let command = path.normalize(atom.config.get("atom-k9.atom-k9-executable"));
    let dummy = [cmd, path.resolve(".atom/packages/atom-k9/examples/", "atom_test.rb")];
    let args = file ? [cmd, file.getPath()] : dummy;
    let options = {};
    console.log(`Running command ${command} ${args.join(' ')}`);
    let stdout = output => this.display(output);
    let stderr = output => this.display(output);
    let exit = code => console.log(`Error code: ${code}`);
    if (!this.view) {
      this.view = new JRubyArtView();
      atom.workspace.addBottomPanel({item: this.view});
    }
    if (this.process) {
      psTree(this.process.process.pid, (err, children) => {
        return children.map((child) =>
          process.kill(child.PID));
      }
      );
      this.view.clear();
    }
    return this.process = new BufferedProcess({command, args, stdout, stderr, exit});
  },


  display(line) {
    return this.view.log(line);
  },

  closeSketch() {
    if (this.view) {
      return this.view.clear();
    }
  }
};

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
