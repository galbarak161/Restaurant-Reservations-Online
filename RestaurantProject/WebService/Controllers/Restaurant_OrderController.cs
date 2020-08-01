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
    [RoutePrefix("api/Restaurant_Order")] //http://localhost:63321/api/Restaurant_Order
    public class Restaurant_OrderController : ApiController
    {
        private RestaurantDBEntities1 db = new RestaurantDBEntities1();
     
        [Route("resId/{restaurantId}/date/{orderDate}")] // GET: api/Restaurant_Order/Resid/{id}/date/{date}
        [ResponseType(typeof(Restaurant_Order))]
        public IHttpActionResult GetOrderIdByDateAndRes(int restaurantId, DateTime orderDate)
        {
            // return order details by Date and ResId
            var order = db.Restaurant_Order.Where(
                o => o.RestaurantId == restaurantId && 
                o.OrderDate == orderDate);
            if (order != null)
            {
                return Ok(order.Select(o => o.OrderId));
            }
            return NotFound();
        }

        [ResponseType(typeof(Restaurant_Order))] // POST: api/Restaurant_Order
        public IHttpActionResult PostRestaurant_Order(Restaurant_Order restaurant_Order)
        {
            //Add new Restaurant_Order field to Database only if it's not excist yet
            var isExcist = db.Restaurant_Order.FirstOrDefault(
                res_order => res_order.RestaurantId == restaurant_Order.RestaurantId
                && res_order.OrderDate == restaurant_Order.OrderDate);

            if (isExcist != null)
            {
                return null;
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Restaurant_Order.Add(restaurant_Order);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = restaurant_Order.OrderId }, restaurant_Order);
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
        private bool Restaurant_OrderExists(int id)
        {
            return db.Restaurant_Order.Count(e => e.OrderId == id) > 0;
        }
    }
}