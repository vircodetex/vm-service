import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // Simple deterministic hash to create repeatable pseudo-random numbers per city
  private hashString(s: string): number {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return h >>> 0;
  }

  // Return number of people for the city (random but meaningful)
  getPeople(city: string): { city: string; population: number, population_year: string } {
    const seed = this.hashString(city.toLowerCase());
    // Use seed to pick a base population range by city name length and seed
    const base = (seed % 9000000) + 10000; // between 10k and ~9.01M
    // Apply a modifier based on vowels to create variety
    const vowelCount = (city.match(/[aeiou]/gi) || []).length;
    const modifier = 1 + (vowelCount % 5) * 0.12;
    const population = Math.round(base * modifier);
    return { city, population, population_year: "2024" };
  }

  // Return temperature (C) and wind speed (kph) with a short description
  getWeather(city: string): { city: string; temperature: number; windSpeed: number; description: string } {
    const seed = this.hashString(city.toLowerCase() + ':weather');
    // Temperature between -15 and 40 C
    const temp = Math.round(((seed % 560) / 560) * 55 - 15);
    // Wind speed between 0 and 80 kph, bias toward lower speeds
    const windSeed = (seed >>> 8) % 1000;
    const wind = Math.round(Math.pow((windSeed % 100) / 100, 1.2) * 80);

    const descriptions = [
      'Sunny',
      'Partly cloudy',
      'Cloudy',
      'Light rain',
      'Heavy rain',
      'Thunderstorms',
      'Snow',
      'Foggy',
      'Windy',
      'Clear night',
    ];
    const desc = descriptions[seed % descriptions.length];

    return { city, temperature: temp, windSpeed: wind, description: desc };
  }
}
