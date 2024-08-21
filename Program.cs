using CadastroDeAluno.Data;
using CadastroDeAluno.Repositorio;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Adicione os servi�os ao cont�iner de inje��o de depend�ncias.
builder.Services.AddControllersWithViews();

// Configura��o do Entity Framework Core
builder.Services.AddDbContext<BancoContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DataBase")));

builder.Services.AddScoped<IAlunoRepositorio, AlunoRepositorio>();

builder.Services.AddScoped<IMateriaRepositorio, MateriaRepositorio>();

var app = builder.Build();

// Configure o pipeline de requisi��o HTTP.
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
