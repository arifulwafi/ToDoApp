# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project files and dependencies for restore
COPY "./TodoApp.Server.csproj" ./

# Restore NuGet packages
RUN dotnet restore ./TodoApp.Server.csproj
    
# Copy the full source
COPY . .

RUN dotnet build TodoApp.Server.csproj -c Release -o /app/build

# -------- STAGE 3: PUBLISH --------
FROM build AS publish
RUN dotnet publish TodoApp.Server.csproj -c Release -o /app/publish

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TodoApp.Server.dll"]
