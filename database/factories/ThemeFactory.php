<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Theme>
 */
class ThemeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->words(2,true),
            'text_url' => fake()->unique()->word(),
            'description' => fake()->sentence(),
            'number_of_theme' => fake()->numberBetween(1, 10),
            'category_id' => fake()->numberBetween(1, 10),
        ];
    }
}
