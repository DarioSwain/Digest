<?php

namespace DS\Digest\Domain\Digest\Model;

use Ramsey\Uuid\Uuid;

/**
 * Class Material
 * @package DS\Digest\Domain\Digest\Model
 */
class Material
{
    private $id;

    protected $title;
    protected $description;
    protected $url;
    protected $createdAt;

    public function __construct(string $url, string $title = '', string $description = '')
    {
        $this->id = Uuid::uuid4();
        $this->createdAt = new \DateTimeImmutable();

        $this->title = $title;
        $this->url = $url;
        $this->description = $description;
    }
}
