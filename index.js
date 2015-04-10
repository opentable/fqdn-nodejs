var shell = require("shelljs");

module.exports = function(callback){

    var cb = callback ? function(code, output){
        if(code !== 0){
            callback(new Error("command exited with code: " + code + " output: " + output));
        }
        callback(null, output.trim());
    } : undefined;

  if (process.platform === "win32") {

      // http://serverfault.com/a/73643/251863
      var env = process.env;
      var fqdn= env.COMPUTERNAME + ( (env.USERDNSDOMAIN && env.USERDNSDOMAIN.length >0) ? "." + env.USERDNSDOMAIN: "");
      if (!callback) {
          return fqdn
      } else {
          callback(null,fqdn);
      }
  }  else {

      if(cb){
          shell.exec("hostname -f", { silent: true }, cb)
      }
      else {
          return shell.exec("hostname -f", { silent: true }).output.trim();
      }

  }
};
