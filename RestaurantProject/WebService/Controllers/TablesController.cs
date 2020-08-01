using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebService;

namespace WebService.Controllers
{
    public class TablesController : ApiController
    {
        private RestaurantDBEntities1 db = new RestaurantDBEntities1();

        // POST: api/Tables
        [ResponseType(typeof(Table))]
        public IHttpActionResult PostTable(Table table)
        {
            //Add new table field to Database
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Tables.Add(table);
            db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = table.Id }, table);
        }

        // DELETE: api/Tables/5
        [ResponseType(typeof(Table))]
        public IHttpActionResult DeleteTable(int id)
        {
            // Delete table from Database by tableId
            Table table = db.Tables.Find(id);
            if (table == null)
            {
                return NotFound();
            }
            db.Tables.Remove(table);
            db.SaveChanges();

            return Ok(table);
        }

        // handling with errors
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        private bool TableExists(int id)
        {
            return db.Tables.Count(e => e.Id == id) > 0;
        }
    }
}