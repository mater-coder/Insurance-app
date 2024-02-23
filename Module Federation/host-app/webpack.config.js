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
       // library: { type: "module" },
       library: { type: "var", name: "hostApp" },

        // For remotes (please adjust)
        name: "hostApp",
        filename: "remoteEntry.js",
        // exposes: {
        //     './Component': './/src/app/app.component.ts',
        // },   
        exposes: {
          // './ButtonComponent': './/src/app/button/button.component.ts'
        },     
        
        // For hosts (please adjust)
        remotes: {
            "remoteApp": "remoteApp@https://insurance-details.netlify.app/remoteEntry.js",
            "remoteApp2": "remoteApp2@https://insurance-details.netlify.app/remoteEntry.js",

        },


        shared: share({
          'shared': { 
            singleton: true,
            requiredVersion: '^0.0.0-shared',
            import: 'http://localhost:4200/remoteEntry.js', 
            shareKey: 'shared'
        },
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
