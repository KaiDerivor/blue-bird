<?php

namespace App\Observers\Tag;

use App\Models\Tag;
use Illuminate\Support\Facades\Cache;

class TagObserver
{
    /**
     * Handle the Tag "created" event.
     *
     * @param  \App\Models\Tag  $tag
     * @return void
     */
    public function created(Tag $tag)
    {
        $this->updateCache();
    }

    /**
     * Handle the Tag "updated" event.
     *
     * @param  \App\Models\Tag  $tag
     * @return void
     */
    public function updated(Tag $tag)
    {
        $this->updateCache();
    }

    /**
     * Handle the Tag "deleted" event.
     *
     * @param  \App\Models\Tag  $tag
     * @return void
     */
    public function deleted(Tag $tag)
    {
        $this->updateCache();
    }

    /**
     * Handle the Tag "restored" event.
     *
     * @param  \App\Models\Tag  $tag
     * @return void
     */
    public function restored(Tag $tag)
    {
        $this->updateCache();
    }

    /**
     * Handle the Tag "force deleted" event.
     *
     * @param  \App\Models\Tag  $tag
     * @return void
     */
    public function forceDeleted(Tag $tag)
    {
        $this->updateCache();
    }

    private function updateCache()
    {
        Cache::forget('tags');
        Cache::forever('tags', Tag::all());
    }
}
