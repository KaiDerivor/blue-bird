<?php


namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;

class ResultSubFilter extends AbstractFilter
{
    public const CATEGORY_ID = 'categoryId';
    public const TAG_ID = 'tagId';


    protected function getCallbacks(): array
    {
        return [
            self::CATEGORY_ID => [$this, 'categoryId'],
            self::TAG_ID => [$this, 'tagId'],
        ];
    }

    public function tagId(Builder $builder, $value)
    {
        $builder->where('tagId', $value);
    }

    public function categoryId(Builder $builder, $value)
    {
        $builder->where('categoryId', $value);
    }
}
