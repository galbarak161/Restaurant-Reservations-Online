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
    [RoutePrefix("api/Users")] //http://localhost:63321/api/Users

    public class UsersController : ApiController
    {
        private RestaurantDBEntities1 db = new RestaurantDBEntities1();

        [Route("all")] // GET: api/Users/all
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUsers()
        {
            //return list of users acording to View_Users
            var userList = db.View_Users;
            if (userList == null)
            {
                return NotFound();
            }
            return Ok(userList);
        }

        [Route("id/{id}")] // GET: api/Users/id/{id}
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUserOrders(int id)
        {
            //return list of orders acording to View_User_Orders_By_UserId 
            //fillter by User Id
            var userOrders = db.View_User_Orders_By_UserId.Where(u => u.UserId == id);
            if (userOrders == null)
            {
                return NotFound();
            }
            return Ok(userOrders);
        }

        [ResponseType(typeof(User))] // POST: api/Users
        public IHttpActionResult PostUser(User user)
        {
            //Add new user to Database 
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Users.Add(user);
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.UserEmail))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return CreatedAtRoute("DefaultApi", new { id = user.UserEmail }, user);
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
        private bool UserExists(string id)
        {
            return db.Users.Count(e => e.UserEmail == id) > 0;
        }
    }
}