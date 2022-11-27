<?php


namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;

class SubFilterUser extends AbstractFilter
{
    public const NAME = 'name';
    public const EMAIL = 'email';
    public const ROLE = 'role';


    protected function getCallbacks(): array
    {
        return [
            self::NAME => [$this, 'name'],
            self::EMAIL => [$this, 'email'],
            self::ROLE => [$this, 'role'],
        ];
    }

    public function name(Builder $builder, $value)
    {
        $builder->where('name', 'like', "%{$value}%");
    }
    public function email(Builder $builder, $value)
    {
        $builder->where('email', 'like', "%{$value}%");
    }
    public function role(Builder $builder, $value)
    {
        $builder->where('role','=', $value);
    }
}
