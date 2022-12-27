<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
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
            'description' => fake()->sentence(),
            'event_type' => ['upgrade', 'zno'][fake()-> numberBetween(0, 1)],
            'category_id' => fake()->numberBetween(1,10),

        ];
    }
}
