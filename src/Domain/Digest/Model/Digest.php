<?php

namespace DS\Digest\Domain\Digest\Model;

use Ramsey\Uuid\Uuid;

/**
 * Class Digest
 * @package DS\Digest\Domain\Digest\Model
 */
class Digest
{
    const STATE_DRAFT = 'draft';

    private $id;
    protected $name;
    protected $state;
    protected $createdAt;
    protected $updatedAt;

    public function __construct(string $name)
    {
        $this->id = Uuid::uuid4();
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();

        $this->name = $name;
        $this->state = self::STATE_DRAFT;
    }
}
