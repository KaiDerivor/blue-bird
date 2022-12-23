<?php


namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;

class SubFilter extends AbstractFilter
{
    public const CATEGORY_ID = 'category_id';
    public const TAG_ID = 'tag_id';
    public const THEME_ID = 'theme_id';

    protected function getCallbacks(): array
    {
        return [
            self::CATEGORY_ID => [$this, 'categoryId'],
            self::TAG_ID => [$this, 'tagId'],
            self::THEME_ID => [$this, 'themeId'],
        ];
    }

    public function tagId(Builder $builder, $value)
    {
        $builder->where('tag_id', $value);
    }

    public function categoryId(Builder $builder, $value)
    {
        $builder->where('category_id', $value);
    }


    public function themeId(Builder $builder, $value)
    {
        $builder->where('theme_id', $value);
    }
}
