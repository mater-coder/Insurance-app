const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;


const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "hostApp",
    publicPath: "auto",
    scriptType: "text/javascript"
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
       library: { type: "var", name: "hostApp" },

        name: "hostApp",
        filename: "remoteEntry.js",
        
        remotes: {
            // "remoteApp": "remoteApp@https://insurance-details.netlify.app/remoteEntry.js",
            // "remoteApp2": "remoteApp2@https://insurance-details.netlify.app/remoteEntry.js",

        },


        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto',eager: true  }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto',eager: true  }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto',eager: true  }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto',eager: true  },

          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};
