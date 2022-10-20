const saleModel = require('../model/schema/flashSaleSchema');
const { convertFormateDate } = require('./helpers');
const schedule = require('node-schedule');

class Timer {
   constructor(document) {
      this.document = document;
      this.job;
      this.refetch;
   }

   cancleTimer() {
      this.job.cancel();
   }

   countTimer(_id, currentDate) {
      if (currentDate > this.startSaleDate) {
         saleModel
            .updateOne({ _id }, { $set: { sale: 'Open' } })
            .then((res) => console.log(`${res} sale is started already`));
      }

      if (currentDate > this.endSaleDate) {
         saleModel
            .updateOne({ _id }, { $set: { sale: 'Close' } })
            .then((res) => console.log(`${res} sale is ended already`));
      }

      if (
         currentDate < this.startSaleDate ||
         (currentDate > this.startSaleDate && currentDate < this.endSaleDate) ||
         currentDate < this.endSaleDate
      ) {
         this.job = schedule.scheduleJob('* * * * * *', () => {
            let currentDate = convertFormateDate(new Date());

            if (currentDate <= this.endSaleDate) {
               if (currentDate === this.startSaleDate) {
                  saleModel.updateOne({ _id }, { $set: { sale: 'Open' } }).then((res) => console.log(res));
               }

               if (currentDate === this.endSaleDate) {
                  saleModel.updateOne({ _id }, { $set: { sale: 'Close' } }).then((res) => {
                     if (!!res.matchedCount) {
                        this.cancleTimer();
                        console.log('sale close');
                     }
                  });
               }
            }
         });

         this.refetch = schedule.scheduleJob('*/15 * * * *', async () => {
            const { _id } = this.document;
            const findSaleDocument = await saleModel.findOne(
               { _id: _id },
               { startTimeWithDate: 1, endTimeWithDate: 1, _id: 0 }
            );
            if (findSaleDocument) {
               const { startTimeWithDate, endTimeWithDate } = findSaleDocument;
               const { startSaleDate, endSaleDate } = this.timeInMiliSeconds(startTimeWithDate, endTimeWithDate);
               this.startSaleDate = startSaleDate;
               this.endSaleDate = endSaleDate;
            }
         });

         if (currentDate === this.endSaleDate) {
            this.refetch.cancel();
         }
      }
   }

   timeInMiliSeconds(startTimeWithDate, endTimeWithDate) {
      const startSaleDate = convertFormateDate(startTimeWithDate);
      const endSaleDate = convertFormateDate(endTimeWithDate);
      let currentDate = convertFormateDate(new Date());

      return {
         startSaleDate,
         endSaleDate,
         currentDate,
      };
   }

   startTimer(insertSaleId) {
      const { startTimeWithDate, endTimeWithDate, _id } = this.document;
      const { startSaleDate, endSaleDate, currentDate } = this.timeInMiliSeconds(startTimeWithDate, endTimeWithDate);

      this.startSaleDate = startSaleDate;
      this.endSaleDate = endSaleDate;

      this.countTimer(_id, currentDate);

      console.log('sale id insrted time', insertSaleId);
      console.log(this, 'inserted time');
   }
}

module.exports = Timer;
