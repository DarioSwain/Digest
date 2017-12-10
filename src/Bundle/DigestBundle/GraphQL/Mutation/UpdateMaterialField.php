<?php

namespace DS\Digest\Bundle\DigestBundle\GraphQL\Mutation;

use DS\Digest\Bundle\DigestBundle\GraphQL\Type\MaterialType;
use DS\Digest\Domain\Digest\Model\Material;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Type\ListType\ListType;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;
use Youshido\GraphQLBundle\Field\AbstractContainerAwareField;

/**
 * Class UpdateMaterialField
 * @package DS\Digest\Bundle\DigestBundle\GraphQL\Mutation
 */
class UpdateMaterialField extends AbstractContainerAwareField
{
    /** {@inheritdoc} */
    public function getType()
    {
        return new MaterialType();
    }

    /** {@inheritdoc} */
    public function build(FieldConfig $config)
    {
        $config->addArguments([
            'id' => new NonNullType(new StringType()),
            'url' => new NonNullType(new StringType()),
            'title' => new StringType(),
            'description' => new StringType(),
            'proposedBy' => new StringType(),
            //TODO: Remove duplication, improve types system.
            'language' => new StringType(),
            'tags' => new ListType(new StringType()),
        ]);

        parent::build($config);
    }

    /** {@inheritdoc} */
    public function resolve($value, array $args, ResolveInfo $info)
    {
        $documentManager = $this->container->get('doctrine_mongodb.odm.document_manager');
        $materialRepository = $documentManager->getRepository(Material::class);

        /** @var Material $material */
        $material = $materialRepository->find($args['id']);
        if (null === $material) {
            throw new \Exception("Material {$args['id']} not found.");
        }

        $material->update(
            $args['url'],
            $args['proposedBy'] ?? null,
            $args['title'] ?? null,
            $args['description'] ?? null,
            $args['language'] ?? Material::DEFAULT_LANGUAGE,
            $args['tags'] ?? []
        );

        $documentManager->persist($material);
        $documentManager->flush($material);

        return $material;
    }
}
