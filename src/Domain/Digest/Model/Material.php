<?php

namespace DS\Digest\Domain\Digest\Model;

use Ramsey\Uuid\Uuid;

/**
 * Class Material
 * @package DS\Digest\Domain\Digest\Model
 */
class Material
{
    const DEFAULT_LANGUAGE = 'EN';
    const SUPPORTED_LANGUAGES = [
        self::DEFAULT_LANGUAGE,
        'RU',
    ];

    /** @var string */
    private $id;
    /** @var string */
    protected $title;
    /** @var string */
    protected $description;
    /** @var string */
    protected $url;
    /** @var string */
    protected $proposedBy;
    /** @var string */
    protected $language;
    /** @var array */
    protected $tags = [];
    /** @var \DateTimeImmutable */
    protected $createdAt;

    /**
     * Material constructor.
     * @param string $url
     * @param string $proposedBy
     * @param string $title
     * @param string $description
     * @param string $language
     * @param array  $tags
     */
    public function __construct(string $url, string $proposedBy, string $title = '', string $description = '', string $language = self::DEFAULT_LANGUAGE, array $tags = [])
    {
        $this->id = (string) Uuid::uuid4();
        $this->createdAt = new \DateTimeImmutable();

        $this->title = $title;
        $this->url = $url;
        $this->proposedBy = $proposedBy;
        $this->description = $description;
        //TODO: Add validation constraint.
        $this->language = $language;
        $this->tags = $tags;
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
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
        return (string) $this->title;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return (string) $this->description;
    }

    /**
     * @return string
     */
    public function getProposedBy(): string
    {
        return $this->proposedBy ?? 'unknown';
    }

    /**
     * @return string
     */
    public function getLanguage(): string
    {
        return $this->language ?? self::DEFAULT_LANGUAGE;
    }

    /**
     * @return array
     */
    public function getTags(): array
    {
        return $this->tags ?? [];
    }

    /**
     * @param string $url
     * @param string $proposedBy
     * @param null|string $title
     * @param null|string $description
     * @param string $language
     * @param array $tags
     */
    public function update(string $url, string $proposedBy, ?string $title, ?string $description, ?string $language = self::DEFAULT_LANGUAGE, array $tags = [])
    {
        $this->url = $url;
        $this->proposedBy = $proposedBy;
        $this->title = (string) $title;
        $this->description = (string) $description;
        $this->language = $language ?? self::DEFAULT_LANGUAGE;
        $this->tags = $tags;
    }
}
