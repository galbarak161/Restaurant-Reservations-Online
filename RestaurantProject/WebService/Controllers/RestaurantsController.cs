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
    [RoutePrefix("api/Restaurants")] //http://localhost:63321/api/Restaurants

    public class RestaurantsController : ApiController
    {
        private RestaurantDBEntities1 db = new RestaurantDBEntities1();

        [Route("id/{id}")] // GET: api/Restaurants/id/{id}
        [ResponseType(typeof(Restaurant))]
        public IHttpActionResult GetRestaurantById(int id)
        {
            // return restaurant object by Id 
            var restaurant = db.View_Restaurant_Details.SingleOrDefault(res => res.RestaurantId==id);
            if (restaurant == null)
            {
                return NotFound();
            }
            return Ok(restaurant);
        }

        [Route("GetResList")] // GET: api/Restaurants/GetResList
        [ResponseType(typeof(Restaurant))]
        public IHttpActionResult GetRestaurantNames()
        {
            // return restaurant names list 
            var resName = db.Restaurants.Select(r => r.Name);
            if (resName != null)
            {
                return Ok(resName);
            }
            return NotFound();
        }

        [Route("id/{id}/date/{date}")] // GET: api/Restaurants/id/{id}/date/{date}
        [ResponseType(typeof(Restaurant))]
        public IHttpActionResult GetRestaurantOrdersByDate(int id, DateTime date)
        {
            // return restaurant orders by date 
            var listRest = db.View_Orders_By_ResId_And_OrderDate
                .Where(r => r.RestaurantId == id)
                .Where(o => o.OrderDate == date);
            if (listRest != null)
            {
                return Ok(listRest);
            }
            return NotFound();
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
        private bool RestaurantExists(int id)
        {
            return db.Restaurants.Count(e => e.RestaurantId == id) > 0;
        }
    }
}