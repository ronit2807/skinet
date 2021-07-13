using API.Extensions;
using API.Helpers;
using API.Middleware;
using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StackExchange.Redis;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration configuration;
        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
            
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddControllers();
            

            services.AddDbContext<StoreContext>(options => options.UseSqlite(
                configuration.GetConnectionString("DefaultConnection")
            ));
            services.AddApplicationServices();
            services.AddSwaggerDocumentation();
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy",policy =>{
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });

            services.AddSingleton<IConnectionMultiplexer>(c=> {
                var config = ConfigurationOptions.Parse(configuration.GetConnectionString("Redis"),true);
                return ConnectionMultiplexer.Connect(config);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
          
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                app.AddSwaggerMiddleware();
            }
             app.UseStatusCodePagesWithReExecute("/error/{0}");

            app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseStaticFiles();
            app.UseCors("CorsPolicy");
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
