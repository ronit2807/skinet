namespace Core.Specifications
{
    public class ProductSpecParams
    {
        public int MaxPageSize =50;
        public int PageNumber { get; set; } = 1;
        public int _pageSize { get; set; } = 6;
        public int PageSize { 
            get => _pageSize; 
            set => _pageSize = (value > MaxPageSize)?50: value; 
        }
        
        public int? BrandId { get; set; }
        
        public int? TypeId { get; set; }
        
        public string Sort { get; set; }
        public string _search { get; set; }
        
        public string Search { 
            get => _search;
            set => _search = value.ToLower();
        }
    }
}