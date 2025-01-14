const { CronJob } = require('cron');

module.exports = function (sails) {
  return {
    jobs: {},

    defaults: { cron: {} },

    initialize: function (cb) {
      sails.on('ready', () => {
        const config = sails.config.cron;
        const jobs = Object.keys(config);
        jobs.forEach(job => {
          this.jobs[job] = new CronJob(
            config[job].schedule,
            config[job].onTick,
            config[job].onComplete,
            typeof config[job].start === 'boolean' ? config[job].start : true,
            config[job].timezone,
            Object.prototype.hasOwnProperty.call(config[job], 'context') ? config[job].context : sails,
            typeof config[job].runOnInit === 'boolean' ? config[job].runOnInit : false
          );
        });
      });

      cb();
    }
  };
};
