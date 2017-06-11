<?php

namespace DS\Digest\Bundle\DigestBundle\GraphQL\Mutation;

use DS\Digest\Bundle\DigestBundle\GraphQL\Type\DigestType;
use DS\Digest\Domain\Digest\Model\Digest;
use DS\Digest\Domain\Digest\Model\Material;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;
use Youshido\GraphQLBundle\Field\AbstractContainerAwareField;

/**
 * Class AddMaterialToDigestField
 * @package DS\Digest\Bundle\DigestBundle\GraphQL\Mutation
 */
class AddMaterialToDigestField extends AbstractContainerAwareField
{
    /** {@inheritdoc} */
    public function getType()
    {
        return new DigestType();
    }

    /** {@inheritdoc} */
    public function build(FieldConfig $config)
    {
        $config->addArguments([
            'digestId' => new NonNullType(new StringType()),
            'materialId' => new NonNullType(new StringType()),
            'section' => new NonNullType(new StringType()),
        ]);

        parent::build($config);
    }

    /** {@inheritdoc} */
    public function resolve($value, array $args, ResolveInfo $info)
    {
        $documentManager = $this->container->get('doctrine_mongodb.odm.document_manager');
        $digestRepository = $documentManager->getRepository(Digest::class);

        /** @var Digest $digest */
        $digest = $digestRepository->find($args['digestId']);
        if (null === $digest) {
            throw new \Exception("Digest {$args['digestId']} not found.");
        }

        $materialRepository = $documentManager->getRepository(Material::class);

        /** @var Material $material */
        $material = $materialRepository->find($args['materialId']);
        if (null === $material) {
            throw new \Exception("Material {$args['materialId']} not found.");
        }

        $digest->addMaterial($args['section'], $material);

        $documentManager->persist($digest);
        $documentManager->flush($digest);

        return $digest;
    }
}
