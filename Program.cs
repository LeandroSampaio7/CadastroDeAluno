using CadastroDeAluno.Data;
using CadastroDeAluno.Repositorio;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Adicione os serviços ao contêiner de injeção de dependências.
builder.Services.AddControllersWithViews();

// Configuração do Entity Framework Core
builder.Services.AddDbContext<BancoContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DataBase")));

builder.Services.AddScoped<IAlunoRepositorio, AlunoRepositorio>();

builder.Services.AddScoped<IMateriaRepositorio, MateriaRepositorio>();

var app = builder.Build();

// Configure o pipeline de requisição HTTP.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Home/Error");
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
	name: "default",
	pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
