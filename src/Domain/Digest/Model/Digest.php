<?php

namespace DS\Digest\Domain\Digest\Model;

use Doctrine\Common\Collections\ArrayCollection;
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
    /** @var Section[]|ArrayCollection */
    protected $sections;
    protected $createdAt;
    protected $updatedAt;

    public function __construct(string $name)
    {
        $this->id = (string) Uuid::uuid4();
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();

        $this->name = $name;
        $this->state = self::STATE_DRAFT;
        $this->sections = new ArrayCollection();
    }

    public function addMaterial(string $sectionName, Material $material)
    {
        if (!$this->hasSection($sectionName)) {
            $this->sections->add(new Section($sectionName));
        }

        $this->getSection($sectionName)->addMaterial($material);
    }

    public function removeMaterial(string $sectionName, string $materialId)
    {
        if (!$this->hasSection($sectionName)) {
            return;
        }

        $this->getSection($sectionName)->removeMaterial($materialId);
    }

    public function hasSection(string $sectionName)
    {
        return null !== $this->getSection($sectionName);
    }

    public function getSection(string $sectionName)
    {
        foreach ($this->sections as $section) {
            if ($section->getName() === $sectionName) {
                return $section;
            }
        }

        return null;
    }

    public function removeSection(string $sectionName)
    {
        $section = $this->getSection($sectionName);
        if (null !== $section) {
            $this->sections->removeElement($section);
        }
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
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
    public function getState(): string
    {
        return $this->state;
    }

    /**
     * @return ArrayCollection|Section[]
     */
    public function getSections()
    {
        return $this->sections;
    }

    /**
     * @param string $name
     */
    public function rename(string $name)
    {
        $this->name = $name;
    }
}
