<?php

namespace DS\Digest\Domain\Digest\Model;

use Doctrine\Common\Collections\ArrayCollection;

/**
 * Class Section
 * @package DS\Digest\Domain\Digest\Model
 */
class Section
{
    protected $name;
    protected $materials;

    public function __construct(string $name)
    {
        $this->name = $name;
        $this->materials = new ArrayCollection();
    }

    public function addMaterial(Material $material)
    {
        $this->materials->add($material);
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return Material[]
     */
    public function getMaterials()
    {
        return $this->materials;
    }
}
