//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebService
{
    using System;
    using System.Collections.Generic;
    
    public partial class Table
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public short TableNumber { get; set; }
        public string UserEmail { get; set; }
        public int NumberOfDiners { get; set; }
    
        public virtual Restaurant_Order Restaurant_Order { get; set; }
        public virtual User User { get; set; }
    }
}
