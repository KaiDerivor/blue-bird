<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $taskQuestion = '';
        $taskVariants = '';

        $rangeLetter = ['А', 'Б', 'В', 'Г', 'Д'];
        $taskType = ['letter4', 'letter5', 'letters3', 'letters4', 'range1', 'range2', 'range3', 'default'][fake()->numberBetween(0, 7)];
        $taskAnswer = '';
        switch ($taskType) {
            case 'letter4': {
                    $taskAnswer = $rangeLetter[fake()->numberBetween(0, 3)];
                    if (fake()->boolean()) {
                        $taskQuestion = fake()->sentence();
                        $taskVariants = [
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),

                        ];
                    }
                    break;
                }

            case 'letter5': {
                    $taskAnswer = $rangeLetter[fake()->numberBetween(0, 4)];
                    if (fake()->boolean()) {
                        $taskQuestion = fake()->sentence();
                        $taskVariants = [
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                        ];
                    }
                    break;
                }
            case 'letters3': {
                    $arr = $rangeLetter;
                    shuffle($arr);
                    $taskAnswer =join('',[$arr[0], $arr[1], $arr[2]]);
                    if (fake()->boolean()) {
                        $taskQuestion = fake()->sentence();
                        $taskVariants = [
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                        ];
                    }
                    break;
                }
            case 'letters4': {
                    $arr = $rangeLetter;

                    shuffle($arr);
                    $taskAnswer =join('',[$arr[0], $arr[1], $arr[2], $arr[3]]);
                    if (fake()->boolean()) {
                        $taskQuestion = fake()->sentence();
                        $taskVariants = [
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                            fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word() . ',' . fake()->word(),
                        ];
                    }
                    break;
                }
            case 'range1': {
                    $taskAnswer = fake()->numberBetween(0, 100);
                    if (fake()->boolean()) {
                        $taskQuestion = fake()->sentence();
                    }
                    break;
                }
            case 'range2': {
                    $taskAnswer = join('',[fake()->numberBetween(0, 100), fake()->numberBetween(0, 100)]);
                    if (fake()->boolean()) {
                        $taskQuestion = fake()->sentence();
                    }
                    break;
                }
            case 'range3': {
                    $taskAnswer = join('', [fake()->numberBetween(1, 7), fake()->numberBetween(1, 7), fake()->numberBetween(1, 7)]);
                    if (fake()->boolean()) {
                        $taskQuestion = fake()->sentence();
                    }
                    break;
                }
            case 'default': {
                    $taskAnswer = '';
                    break;
                }
            default: {
                    $taskAnswer = '';
                }
        }

        // if(fake()->boolean()){
        //     $taskAuestion = fake()->sentence();
        //     $taskVariants=
        // }
        $img = fake()->boolean() ? 'https://source.unsplash.com/random/?' . fake()->word() : null;

        return [
            'img' => $img,
            'answer' => $taskAnswer,
            'content' => fake()->text(),
            'task_type' => $taskType,
            'test_qa' => json_encode([
                'taskQuestion' => $taskQuestion,
                'taskAnswers' => $taskVariants
            ]),
            'category_id' => fake()->numberBetween(1, 10),
            'tag_id' => fake()->numberBetween(1, 10),

        ];
    }
}
