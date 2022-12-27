<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->word(),
            'text_url' => fake()->unique()->word(),
            'description' => fake()->sentence(),
            'img' => 'https://source.unsplash.com/random/?' . fake()->word(),
        ];
    }
}
