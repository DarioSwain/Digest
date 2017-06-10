<?php

namespace DS\Digest\Domain\Digest\Model;

use Ramsey\Uuid\Uuid;

/**
 * Class Material
 * @package DS\Digest\Domain\Digest\Model
 */
class Material
{
    /** @var string */
    private $id;
    /** @var string */
    protected $title;
    /** @var string */
    protected $description;
    /** @var string */
    protected $url;
    /** @var \DateTimeImmutable */
    protected $createdAt;

    /**
     * Material constructor.
     * @param string $url
     * @param string $title
     * @param string $description
     */
    public function __construct(string $url, string $title = '', string $description = '')
    {
        $this->id = (string) Uuid::uuid4();
        $this->createdAt = new \DateTimeImmutable();

        $this->title = $title;
        $this->url = $url;
        $this->description = $description;
    }

    /**
     * @return string
     */
    public function getUrl(): string
    {
        return $this->url;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }
}
