<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Event;
use App\Models\Rule;
use App\Models\Tag;
use App\Models\Task;
use App\Models\Theme;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\LaravelIgnition\Support\Composer\FakeComposer;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {




        User::factory(10)->create();
        
        $categories = Category::factory(10)->create();
        $rules = Rule::factory(50)->create();
        $tags = Tag::factory(10)->create();
        $themes = Theme::factory(40)->create();
        $tasks = Task::factory(2400)->create();
        Event::factory(20)->create();
        foreach ($categories as $cat) {
            $tagsId = $tags->random(5)->pluck('id');
            $cat->tags()->attach($tagsId);
        }
    }
}
