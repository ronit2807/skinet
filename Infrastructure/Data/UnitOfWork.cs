using System;
using System.Collections;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        public StoreContext Context { get; }
        private Hashtable _repositories;
        public UnitOfWork(StoreContext context)
        {
            this.Context = context;
        }

        public async Task<int> Complete()
        {
            return await Context.SaveChangesAsync();
        }

        public void Dispose()
        {
            Context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if(_repositories == null) _repositories = new Hashtable();
            var type = typeof(TEntity).Name;
            if(!_repositories.ContainsKey(type))
            {
                var repositoryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)),Context);

                _repositories.Add(type,repositoryInstance);
            }

            return (IGenericRepository<TEntity>) _repositories[type];
        }
    }
}